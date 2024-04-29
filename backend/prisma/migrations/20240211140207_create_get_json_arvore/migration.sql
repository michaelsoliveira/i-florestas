CREATE OR REPLACE FUNCTION geo_json_arvore(type varchar(20), id uuid)
RETURNS table (j json) AS
$$
	BEGIN
		IF ($1 = 'by-ut') THEN
			RETURN QUERY SELECT json_build_object(
			'type', 'FeatureCollection',
			'crs',  json_build_object(
				'type',      'name', 
				'properties', json_build_object(
					'name', 'EPSG:4326'  
				)
			), 
			'features', json_agg(
				json_build_object(
					'type',       'Feature',
					'id',         a.id, -- the GeoJson spec includes an 'id' field, but it is optional, replace {id} with your id field
					'geometry',   ST_AsGeoJSON(ST_geomfromtext('POINT(' || a.lng || ' ' || a.lat  || ')',4326))::json,
					'properties', json_build_object(
						-- list of fields
						'numero_arvore', a.numero_arvore,
						'latitude', a.lat,
						'longitude', a.lng,
						'dap', a.dap,
						'cap', a.dap,
						'altura', a.altura,
						'volume', a.volume
					)
				)
			)
		)
		FROM arvore a 
		WHERE a.id_ut = $2;
	ELSE
		RETURN QUERY SELECT json_build_object(
			'type', 'FeatureCollection',
			'crs',  json_build_object(
				'type',      'object', 
				'properties', json_build_object(
					'name', 'EPSG:4326'  
				)
			), 
			'features', json_agg(
				json_build_object(
					'type',       'Feature',
					'id',         a.id, -- the GeoJson spec includes an 'id' field, but it is optional, replace {id} with your id field
					'geometry',   ST_AsGeoJSON(ST_geomfromtext('POINT(' || a.lng || ' ' || a.lat  || ')',4326))::json,
					'properties', json_build_object(
						-- list of fields
						'numero_arvore', a.numero_arvore,
						'latitude', a.lat,
						'longitude', a.lng,
						'dap', a.dap,
						'cap', a.dap,
						'altura', a.altura,
						'volume', a.volume
					)
				)
			)
		)
		FROM arvore a 
		INNER JOIN ut b ON b.id = a.id_ut		
		WHERE b.id_upa = $2;
	END IF;
	END;
$$
LANGUAGE plpgsql IMMUTABLE;