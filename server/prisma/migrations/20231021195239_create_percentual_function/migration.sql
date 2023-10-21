-- This is an empty migration.

-- DROP FUNCTION public.percente(double precision, numeric);
CREATE OR REPLACE FUNCTION public.percente(amostra double precision, universo numeric)
  RETURNS real AS
$BODY$
DECLARE
 x ALIAS FOR $1;
 y ALIAS FOR $2;
 r numeric;

BEGIN
r := COALESCE((nvl(x * y)/100));        

return r;  
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER FUNCTION public.percente(double precision, numeric)
  OWNER TO postgres;