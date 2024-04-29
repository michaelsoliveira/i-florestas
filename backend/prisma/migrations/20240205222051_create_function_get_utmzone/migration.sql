-- This is an empty migration.

CREATE OR REPLACE FUNCTION get_utmzone(input_geom geometry)
  RETURNS integer AS
$BODY$
DECLARE
   zone int;
   pref int;
BEGIN
   IF GeometryType(input_geom) != 'POINT' THEN
     RAISE EXCEPTION 'Input geom must be a point. Currently is: %', GeometryType(input_geom);
   END IF;
   IF ST_Y(input_geom) >0 THEN
      pref:=32600;
   ELSE
      pref:=32700;
   END IF;
   zone = floor((ST_X(input_geom)+180)/6)+1;
   RETURN zone+pref;
END;
$BODY$
LANGUAGE plpgsql IMMUTABLE;