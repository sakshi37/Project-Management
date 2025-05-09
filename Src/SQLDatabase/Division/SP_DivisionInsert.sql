
CREATE OR ALTER PROCEDURE SP_DivisionInsert
    @DivisionName NVARCHAR(75),
	@ProjectManagerName NVARCHAR(100),
    @PrefixName NVARCHAR(20),
    @Fk_HolidayId INT,
    @ManHours FLOAT,
    @DivisionStatus BIT,
    @CreatedBy INT
AS
BEGIN

    -- Insert into Tbl_DivisionMaster
    INSERT INTO Tbl_DivisionMaster (
        DivisionName, ProjectManagerName, PrefixName,
        Fk_HolidayId, ManHours, DivisionStatus,
        CreatedBy, CreatedDate
    )
    VALUES (
        @DivisionName, @ProjectManagerName, @PrefixName,
        @Fk_HolidayId, @ManHours, @DivisionStatus,
        @CreatedBy, GETDATE()
    );

    SELECT 'Division Added Successfully' AS Message;
END;



EXEC SP_InsertDivision
    @DivisionName = 'Finance Division',
	@ProjectManagerName = 'Vaishnavi Bhambure',
    @PrefixName = 'FIN',
    @Fk_HolidayId = 1,  -- make sure this exists
    @ManHours = 180,
    @CreatedBy = 'Admin';
