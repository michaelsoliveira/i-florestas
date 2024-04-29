-- Function: public.trigger_upa()

-- DROP FUNCTION public.trigger_upa();

CREATE OR REPLACE FUNCTION public.trigger_upa()
  RETURNS trigger AS
$BODY$
    BEGIN
      UPDATE ut
      SET id_upa = NEW.id
      WHERE id_upa = NEW.id;
      RETURN NEW;
    END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER FUNCTION public.trigger_upa()
  OWNER TO postgres;

DROP TRIGGER IF EXISTS trigger_upa ON upa;

CREATE TRIGGER trigger_upa
  AFTER UPDATE
  ON public.upa
  FOR EACH ROW
  EXECUTE PROCEDURE public.trigger_upa();

CREATE OR REPLACE FUNCTION public.trigger_ut_before()
  RETURNS trigger AS
    $BODY$
        DECLARE epsg integer;
        DECLARE origem geometry;
		    DECLARE utm_zone integer;

        BEGIN
        SELECT COALESCE(srid) into epsg FROM upa
        WHERE id = NEW.id_upa;
        
        IF (CAST(epsg AS INTEGER) > 5000) THEN
          origem := ST_geomfromtext('POINT(' || NEW.este || ' ' || NEW.norte  || ')',epsg);
          NEW.latitude := ST_Y(ST_AsText(ST_Transform(ST_SetSRID(origem, epsg), 4326)));
          NEW.longitude := ST_X(ST_AsText(ST_Transform(ST_SetSRID(origem, epsg), 4326)));
          raise notice 'inserted/updated: [latitude"%",  longitude "%"]', new.latitude, new.longitude;
        ELSE
          origem := ST_geomfromtext('POINT(' || new.longitude || ' ' || new.latitude  || ')',epsg);
          utm_zone := get_utmzone(origem);
          new.norte := ST_Y(ST_Transform(origem, utm_zone));
          new.este := ST_X(ST_Transform(origem, utm_zone));		
          raise notice 
            'inserted/updated: [latitude "%",  longitude "%"], [Norte "%" Leste "%"]', 
            new.latitude, new.longitude, new.norte, new.este;
          
        END IF;

        NEW.origem = origem;

        RETURN NEW;
        END;
    $BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER FUNCTION public.trigger_ut_before()
  OWNER TO postgres;

DROP TRIGGER IF EXISTS trigger_ut_before ON ut;

CREATE TRIGGER trigger_ut_before
  BEFORE INSERT OR UPDATE
  ON public.ut
  FOR EACH ROW
  EXECUTE PROCEDURE public.trigger_ut_before();

-- Function: public.trigger_ut_after()

-- DROP FUNCTION public.trigger_ut_after();

CREATE OR REPLACE FUNCTION public.trigger_ut_after()
  RETURNS trigger AS
    $BODY$
        BEGIN

        UPDATE arvore SET id_ut = new.id WHERE id_ut = NEW.id;

        RETURN NEW;
        END;
    $BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER FUNCTION public.trigger_ut_after()
  OWNER TO postgres;

DROP TRIGGER IF EXISTS trigger_ut_after ON ut;

CREATE TRIGGER trigger_ut_after
  BEFORE INSERT OR UPDATE
  ON public.ut
  FOR EACH ROW
  EXECUTE PROCEDURE public.trigger_ut_after();