class ApiFeatures{
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }
    search(){
        const keyword = this.queryStr.keyword?
        {
            name: {
                "$regex": this.queryStr.keyword,
                "$options": "i"   //case-insensitive
            },
        }
        :
        {}
        console.log(keyword);
        this.query = this.query.find({...keyword});
        return this;
    }

    filter(){
        //Creating deep copy of the this.queryStr
        const queryCopy = {...this.queryStr};

        //Removing some fields for category
        const removeFields = ["keyword","page","limit"];
        removeFields.forEach((key) => delete queryCopy[key]);

        //Stringfying the query
        let queryStr = JSON.stringify(queryCopy);
        console.log(queryCopy);

        //Replacing the filter with ${filter}
        //queryStr = queryStr.replace(/gt/g, "$gt").replace(/gte/g, "$gte").replace(/lt/g, "$lt").replace(/lte/g, "$lte");
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`);
        console.log(queryStr);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page)||1;
        const skip = resultPerPage*(currentPage-1);
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}
export default ApiFeatures;