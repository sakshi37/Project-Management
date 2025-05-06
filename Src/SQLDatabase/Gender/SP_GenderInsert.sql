CREATE or alter PROCEDURE SP_GenderInsert
    @Name NVARCHAR(100)
    
AS
BEGIN
    SET NOCOUNT ON;

    
        INSERT INTO Tbl_GenderMaster (GenderType)
        VALUES (@Name);

        PRINT 'Employee inserted successfully.';
    END
    

