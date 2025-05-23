create or ALTER PROCEDURE [dbo].[SP_GetAllEmployeeSummary]
AS
BEGIN
    SELECT 
        E.Image,
        E.Name,
        E.Code,
        E.Address,
        E.MobileNo,
        E.SkypeId,
        E.JoinDate,
        E.Email,
        E.BccEmail,
        E.PanNumber,
        E.BirthDate,
        E.Signature,
        E.LeftCompany,
        E.LeftDate,
        D.DesignationName,
        B.BranchName,
        DV.DivisionName,
        UG.UserGroupName,
        E.LoginStatus,
        'Edit/Delete' AS Action
    FROM Tbl_Employee_master E
    INNER JOIN Tbl_DesignationMaster D ON E.Fk_DesignationId = D.DesignationId
    INNER JOIN Tbl_BranchMaster B ON E.Fk_BranchId = B.BranchId
    INNER JOIN Tbl_DivisionMaster DV ON E.Fk_DivisionId = DV.DivisionId
    LEFT JOIN Tbl_UserGroupMaster UG ON E.Fk_UserGroupId = UG.UserGroupId
END;


Exec dbo.SP_GetAllEmployeeSummary;
select * from Tbl_Employee_master;