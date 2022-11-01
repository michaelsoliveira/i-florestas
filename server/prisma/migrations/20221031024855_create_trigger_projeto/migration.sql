CREATE OR REPLACE FUNCTION before_insert_update_projeto()
  RETURNS trigger AS
$$
BEGIN
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