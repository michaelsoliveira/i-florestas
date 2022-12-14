CREATE OR REPLACE FUNCTION before_insert_update_arvore()
  RETURNS trigger AS
$$

DECLARE tipo_gps integer;
DECLARE epsg integer;
DECLARE epsg_utm integer;
DECLARE quadrante integer;
DECLARE largura integer;
DECLARE azimute float;
DECLARE latitude float;
DECLARE longitude float;
DECLARE x float;
DECLARE y float;
DECLARE lat_ut float;
DECLARE long_ut float;
DECLARE origem geometry;
DECLARE arvore geometry;

BEGIN
epsg := (SELECT COALESCE(b.srid) FROM ut a INNER JOIN upa b on b.id_upa = a.id_upa WHERE a.id_ut = NEW.id_ut GROUP BY b.srid);
tipo_gps := (SELECT COALESCE(b.tipo) FROM ut a INNER JOIN upa b on b.id_upa = a.id_upa WHERE a.id_ut = NEW.id_ut GROUP BY b.tipo);
SELECT INTO largura, lat_ut,  long_ut, azimute, quadrante COALESCE(a.largura_faixas), COALESCE(a.latitude), COALESCE(a.longitude), COALESCE(a.azimute), COALESCE(a.quadrante) FROM ut a WHERE a.id_ut = NEW.id_ut;

   
IF ((NEW.lat_x IS NULL) OR (NEW.long_y IS  NULL)) THEN
	RETURN NEW;
END IF;

IF ((lat_ut IS NULL) OR (long_ut IS NULL)) THEN
	RETURN NEW;
END IF;


IF (tipo_gps=1) THEN

    origem := ST_geomfromtext('POINT(' || long_ut || ' ' || lat_ut  || ')',epsg);

    IF ((epsg=4326) OR (epsg=4674)) THEN
        epsg_utm := get_utmzone(origem);
        origem := ST_Transform(origem, epsg_utm);
    END IF;

	IF (NEW.orient_x = 'D') THEN
		x := largura*(NEW.faixa-1)+NEW.lat_x;
	ELSE
		x := largura*(NEW.faixa-1)-NEW.lat_x;
	END IF;
   	y := NEW.long_y;
	azimute := radians(azimute);

	IF (quadrante=1) THEN
		arvore := ST_Translate(origem,x,y);
	ELSIF (quadrante=2) THEN
		arvore := ST_Translate(origem,x,-y);
	ELSIF (quadrante=3) THEN
    	arvore := ST_Translate(origem,-x,-y);
	ELSEIF (quadrante=4) THEN
		arvore := ST_Translate(origem,-x,y);    
	ELSE 
		arvore := ST_Translate(origem,x,y);
	END IF;

	arvore := ST_Rotate(arvore, azimute, origem);

ELSE
	arvore := ST_geomfromtext('POINT(' || NEW.long_y || ' ' || NEW.lat_x  || ')',epsg);    
END IF;


IF (((epsg=4326) OR (epsg=4674)) AND (tipo_gps=1)) THEN
	NEW.ponto_arvore = ST_Transform(arvore, epsg);
ELSE
    NEW.ponto_arvore = arvore;
END IF;

IF (NEW.ponto_arvore IS NOT NULL) THEN
	NEW.lng = ST_X(ST_TRANSFORM(NEW.ponto_arvore,4326));
	NEW.lat = ST_Y(ST_TRANSFORM(NEW.ponto_arvore,4326));
END IF;

RETURN NEW;
END;

$$
LANGUAGE 'plpgsql';

CREATE TRIGGER trigger_arvore
BEFORE INSERT OR UPDATE ON arvore
FOR EACH ROW
EXECUTE FUNCTION before_insert_update_arvore();
