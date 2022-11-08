CREATE OR REPLACE FUNCTION before_insert_update_projeto()
  RETURNS trigger AS
$$
DECLARE id_exists TEXT;
BEGIN
SELECT id_projeto INTO id_exists FROM projeto_users WHERE id_user = NEW.id_user;
    IF NOT FOUND THEN
NEW.active := TRUE;
END IF;

IF NEW.active = TRUE THEN
UPDATE projeto_users set active = FALSE WHERE id_projeto != NEW.id_projeto AND id_user = NEW.id_user;

END IF;
RETURN NEW;

END;

$$
LANGUAGE 'plpgsql';

CREATE TRIGGER update_projeto
BEFORE INSERT OR UPDATE ON projeto
FOR EACH ROW
EXECUTE FUNCTION before_insert_update_projeto();