
CREATE OR ALTER PROCEDURE SP_DivisionUpdate
    @DivisionId INT,
    @DivisionName NVARCHAR(75),
    @ProjectManagerName NVARCHAR(100),
    @PrefixName NVARCHAR(20),
    @Fk_HolidayId INT,
    @ManHours FLOAT,
    @DivisionStatus BIT,
    @UpdatedBy INT
AS
BEGIN
    UPDATE Tbl_DivisionMaster
    SET 
        DivisionName = @DivisionName,
        ProjectManagerName = @ProjectManagerName,
        PrefixName = @PrefixName,
        Fk_HolidayId = @Fk_HolidayId,
        ManHours = @ManHours,
        DivisionStatus = @DivisionStatus,
        UpdatedBy = @UpdatedBy,
        UpdatedDate = GETDATE()
    WHERE DivisionId = @DivisionId;

    SELECT 'Division Updated Successfully' AS Message;
END;
