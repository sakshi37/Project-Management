

EXEC SP_CountryInsert @CountryName = 'India',  @CountryCode = '+91', @CreatedBy = 1 ;

EXEC SP_CountryUpdate @CountryId = 1,@CountryName = 'India', @CountryCode = '+91', @UpdatedBy=1, @CountryStatus=1 ;

EXEC SP_CountryDelete  1; 


select * from Tbl_CountryMaster;



