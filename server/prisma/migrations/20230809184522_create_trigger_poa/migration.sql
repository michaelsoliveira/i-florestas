-- Function: public.trigger_poa()

-- DROP FUNCTION public.trigger_poa();

CREATE OR REPLACE FUNCTION public.trigger_poa()
  RETURNS trigger AS
$BODY$
DECLARE poa_ativo text;

BEGIN
    poa_ativo := (SELECT COALESCE(id_poa_ativo) FROM projeto WHERE id = NEW.id_projeto);

    IF (poa_ativo IS NULL) THEN
        UPDATE projeto set id_poa_ativo = NEW.id WHERE id = NEW.id_projeto;
    ELSE
        RETURN NEW;
    END IF;

RETURN NEW;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER FUNCTION public.trigger_poa()
  OWNER TO postgres;

CREATE TRIGGER trigger_poa
  AFTER INSERT
ON public.poa
  FOR EACH ROW
  EXECUTE PROCEDURE public.trigger_poa();