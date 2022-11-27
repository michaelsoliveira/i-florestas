CREATE OR REPLACE FUNCTION change_pessoa_after_update()
  RETURNS TRIGGER
  LANGUAGE PLPGSQL
  AS
$$

BEGIN
    IF NEW.tipo != OLD.tipo THEN
        IF NEW.tipo = 'F' THEN
            DELETE FROM pessoa_juridica WHERE id = NEW.id_pessoa_juridica;
        ELSE
            DELETE FROM pessoa_fisica WHERE id = NEW.id_pessoa_fisica;
        END IF;
    END IF;
    RETURN NEW;
END;

$$;

CREATE TRIGGER trigger_after_update_pessoa
  AFTER UPDATE
  ON pessoa
  FOR EACH ROW
  EXECUTE PROCEDURE change_pessoa_after_update();