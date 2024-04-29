CREATE OR REPLACE FUNCTION geo_json_shape_ut(type varchar(20), id uuid)
RETURNS table (j json) AS
$$
	BEGIN
		CASE
		WHEN ($1 = 'by-ut') THEN
			RETURN QUERY SELECT row_to_json(fc) AS st_asgeojson FROM
				(SELECT 'FeatureCollection' As type, 
				array_to_json(array_agg(f)) As features 
				FROM (
					SELECT 
						'Feature' As type, 
						ST_AsGeoJSON(a.polygon_path)::json As geometry,
						row_to_json((a.id, a.numero_ut)) As properties FROM ut a
					WHERE a.id = $2::uuid
				) As f) as fc;
		WHEN ($1 = 'by-upa') THEN
			RETURN QUERY SELECT row_to_json(fc) AS st_asgeojson FROM
				(SELECT 'FeatureCollection' As type, 
				array_to_json(array_agg(f)) As features 
				FROM (
					SELECT 
						'Feature' As type, 
						ST_AsGeoJSON(a.polygon_path)::json As geometry,
						row_to_json((a.id, a.numero_ut)) As properties FROM ut a
					WHERE a.id_upa = $2::uuid
				) As f) as fc;
		ELSE
			RETURN QUERY SELECT row_to_json(fc) AS st_asgeojson FROM
				(SELECT 'FeatureCollection' As type, 
				array_to_json(array_agg(f)) As features 
				FROM (
					SELECT 
						'Feature' As type, 
						ST_AsGeoJSON(a.polygon_path)::json As geometry,
						row_to_json((a. id, a.numero_ut)) As properties FROM ut a
					INNER JOIN upa b ON b.id = a.id_upa
					INNER JOIN umf c ON c.id = b.id_umf
					INNER JOIN projeto p ON p.id = c.id_projeto
					WHERE p.id = $2::uuid
				) As f) as fc;
		END CASE;
	END;
$$
LANGUAGE plpgsql IMMUTABLE;