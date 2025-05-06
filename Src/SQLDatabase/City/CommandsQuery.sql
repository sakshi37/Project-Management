EXEC SP_CityInsert 
    @Fk_StateId = 1,              
    @CityName = 'Pune',
    @CityStatus = 1,
    @CreatedBy = 1;

EXEC SP_CityUpdate 
    @CityId = 2,                  
    @Fk_StateId = 1,              
    @CityName = 'Mumbai',
    @CityStatus = 1,
    @UpdatedBy = 1;

EXEC SP_CityDelete
    @CityId = 1,                   
    @UpdatedBy = 1;

EXEC SP_GetAllCities;

EXEC SP_GetCityById 
    @CityId = 1;
