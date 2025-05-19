create procedure [dbo].[SP_GetEmployeeFamilyDetailsByCode]
 @Code varchar(20)
 AS
 Begin
 select
 FMT.FamilyMemberTypeName,
 FM.FamilyMemberName,
 FM.BirthDate,
 FM.Age,
 FM.RelationWithEmployee
 from dbo.Tbl_FamilyMaster FM
 inner join dbo.Tbl_Employee_master E on FM.Fk_Id=E.Id
 inner join dbo.FamilyMemberTypeMaster FMT on FM.Fk_FamilyMemberTypeId=FMT.FamilyMemberTypeId
 where
	E.Code=@Code
end;

drop procedure  SP_GetEmployeeFamilyDetailsByCode

exec SP_GetEmployeeFamilyDetailsByCode @Code=EMP25455