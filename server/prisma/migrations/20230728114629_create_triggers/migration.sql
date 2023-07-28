-- Function: public.trigger_upa()

-- DROP FUNCTION public.trigger_upa();

CREATE OR REPLACE FUNCTION public.trigger_upa()
  RETURNS trigger AS
$BODY$
    BEGIN
        IF (cast(OLD.srid as INTEGER) > 5000 AND cast(NEW.srid as INTEGER) > 5000) THEN
            UPDATE ut
            SET 
            origem = ST_Transform(origem, new.srid)
            WHERE id_upa = new.id ;
        ELSE
            UPDATE ut
            SET 
            latitude = ST_Y(ST_Transform(origem, new.srid)), 
            longitude = ST_X(ST_Transform(origem, new.srid))
            WHERE id_upa = new.id ;
        END IF;
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

        BEGIN

        epsg := (SELECT COALESCE(b.srid) FROM ut a INNER JOIN upa b on b.id = a.id_upa WHERE a.id = NEW.id GROUP BY b.srid);

        origem := ST_geomfromtext('POINT(' || NEW.longitude || ' ' || NEW.latitude  || ')',epsg);
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

        UPDATE arvore SET id_ut = new.id WHERE id_ut=NEW.id;

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