EXEC SP_Employee_insert
    @Name = 'Aarav Mehta',
    @Code = 'EMP003',
    @Address = '789 Green Valley, Pune',
    @MobileNo = '9876543212',
    @SkypeId = 'aarav.mehta',
    @JoinDate = '2024-07-01',
    @Email = 'aarav.mehta@example.com',
    @BccEmail = 'hr@company.com',
    @PanNumber = 'GHJKL6789M',
    @BirthDate = '1995-04-10',
    @Image = 'images/aarav.jpg',
    @Signature = 'signatures/aaravsign.png',
    @LoginStatus = 1,
    @LeftCompany = 0,
    @LeftDate = NULL,

    @Fk_LocationId = 1,
    @Fk_DesignationId = 2,
    @Fk_ShiftId = 1,
    @Fk_EmployeeTypeId = 1,
    @Fk_UserGroupId = 3,
    @Fk_BranchId = 1,
    @Fk_DivisionId = 2;


	select * from Tbl_Employee_master