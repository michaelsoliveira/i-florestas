CREATE OR REPLACE FUNCTION change_pessoa_before_update()
  RETURNS TRIGGER
  LANGUAGE PLPGSQL
  AS
$$

BEGIN
    IF NEW.tipo != OLD.tipo THEN
        IF NEW.tipo = 'F' THEN
            DELETE FROM pessoa_juridica WHERE id_pessoa = NEW.id;
        ELSE
            DELETE FROM pessoa_fisica WHERE id_pessoa = NEW.id;
        END IF;
    END IF;
    RETURN NEW;
END;

$$;

CREATE TRIGGER trigger_before_update_pessoa
  BEFORE UPDATE
  ON pessoa
  FOR EACH ROW
  EXECUTE PROCEDURE change_pessoa_before_update();