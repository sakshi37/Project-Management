
CREATE PROCEDURE SP_InsertDivision
    @DivisionName NVARCHAR(75),
	@ProjectManagerName NVARCHAR(100),
    @PrefixName NVARCHAR(20),
    @Fk_HolidayId INT,
    @ManHours FLOAT,
    @CreatedBy NVARCHAR(50)
AS
BEGIN

    -- Insert into Tbl_DivisionMaster
    INSERT INTO Tbl_DivisionMaster (
        DivisionName,
        ProjectManagerName,
        PrefixName,
        Fk_HolidayId,
        ManHours,
        DivisionStatus,
        CreatedBy,
        CreatedDate,
        UpdatedBy,
        UpdatedDate
    )
    VALUES (
        @DivisionName,
        @ProjectManagerName,
        @PrefixName,
        @Fk_HolidayId,
        @ManHours,
        1,  -- Default DivisionStatus to Active
        @CreatedBy,
        SYSDATETIME(),
        @CreatedBy,
        SYSDATETIME()
    );
END;



EXEC SP_InsertDivision
    @DivisionName = 'Finance Division',
	@ProjectManagerName = 'Vaishnavi Bhambure',
    @PrefixName = 'FIN',
    @Fk_HolidayId = 1,  -- make sure this exists
    @ManHours = 180,
    @CreatedBy = 'Admin';
