DROP PROCEDURE IF EXISTS SP_InsertFamilyMember;
GO
CREATE PROCEDURE [dbo].[sp_InsertFamilyMember]
    @Fk_FamilyMemberTypeId INT,
    @Fk_Id INT,
    @FamilyMemberName NCHAR(75),
    @BirthDate DATE,
    @Age INT,
    @RelationWithEmployee NCHAR(75),
    @CreatedBy INT,
    @FamilyStatus BIT
AS
BEGIN
    INSERT INTO [dbo].[Tbl_FamilyMaster] (
        Fk_FamilyMemberTypeId,
        Fk_Id,
        FamilyMemberName,
        BirthDate,
        Age,
        RelationWithEmployee,
        CreatedBy,
        CreatedDate,  -- This will get the current date automatically
        FamilyStatus
    )
    VALUES (
        @Fk_FamilyMemberTypeId,
        @Fk_Id,
        @FamilyMemberName,
        @BirthDate,
        @Age,
        @RelationWithEmployee,
        @CreatedBy,
        GETDATE(),  -- Automatically uses the current date and time
        @FamilyStatus
    );
END;



EXEC [dbo].[sp_InsertFamilyMember]
    @Fk_FamilyMemberTypeId = 1,
    @Fk_Id = 1,
    @FamilyMemberName = N'Ravi Sharma',
    @BirthDate = '2000-05-10',
    @Age = 24,
    @RelationWithEmployee = N'Son',
    @CreatedBy = 1,
    @FamilyStatus = 1;





	select * from Tbl_FamilyMaster;