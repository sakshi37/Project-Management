CREATE OR ALTER PROCEDURE SP_CounterUpdate
AS
BEGIN
    UPDATE dbo.Tbl_CounterMaster
    SET Id = Id + 1;
END;


EXEC SP_CounterUpdate