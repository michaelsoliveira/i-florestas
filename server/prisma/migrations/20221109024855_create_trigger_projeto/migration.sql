CREATE OR REPLACE FUNCTION before_insert_update_projeto_users()
  RETURNS trigger AS
$$
DECLARE id_u TEXT;
DECLARE id_proj TEXT;

BEGIN
	SELECT id_user, id_projeto INTO id_u, id_proj FROM projeto_users 
		WHERE id_projeto = NEW.id_projeto AND id_user = NEW.id_user;
	IF NOT FOUND THEN
		NEW.active := TRUE;
	END IF;

	IF NEW.active = TRUE THEN
		UPDATE projeto_users SET active = false WHERE id_projeto != NEW.id_projeto AND id_user = NEW.id_user;
	END IF;

	RETURN NEW;

END;

$$
LANGUAGE 'plpgsql';

CREATE TRIGGER update_projeto_users
BEFORE INSERT OR UPDATE ON projeto_users
FOR EACH ROW
EXECUTE FUNCTION before_insert_update_projeto_users();