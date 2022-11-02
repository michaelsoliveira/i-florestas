CREATE OR REPLACE FUNCTION before_insert_update_projeto()
  RETURNS trigger AS
$$
DECLARE id_exists TEXT;
BEGIN
	SELECT id INTO id_exists FROM projeto;
    IF NOT FOUND THEN
		NEW.active := TRUE;
	END IF;
	
	IF NEW.active = TRUE THEN
		UPDATE projeto set active = FALSE WHERE id != NEW.id AND id_empresa = NEW.id_empresa;
	
END IF;
RETURN NEW;

END;

$$
LANGUAGE 'plpgsql';

CREATE TRIGGER update_projeto
	BEFORE INSERT OR UPDATE ON projeto
	FOR EACH ROW
	EXECUTE FUNCTION before_insert_update_projeto();