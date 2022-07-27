// Search Functioanlity and Paginaion :
module.exports = function SearchFunctionality_Pagination (model, query, array) {

    return async (req, res, next) => {

        try {
            //Pagination :
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);
  
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const results = {};
  
            if (endIndex < await model.countDocuments().exec()) {
                results.next = {
                    page: page,
                    limit: limit
                };
            }
      
            if (startIndex > 0) {
                results.previous = {
                    page: page - 1,
                    limit: limit
                };
            }

            //Search Funtionality :
            const variable = {};
            const query_params = {};
            for (i in query) {
                variable[query[i]] = req.query[query[i]];
                if (variable[query[i]] != null) {
                    query_params[query[i]] = { "$regex": variable[query[i]], "$options": "i" };
                }
            }
            var count = Object.keys(query_params).length;

            //Response :
            if (count != 0) {
                const candidate = await model.find(query_params).populate(array).limit(limit).skip(startIndex).exec();
                if (candidate.length > 0) {
                    results.results = candidate;
                    res.Results = results;
                    next();
                } else {
                    res.status(400).json({
                        "status": {
                            "success": false,
                            "code": 400,
                            "message": "not found"
                        }
                    });
                }
            } else {
                if (res.locals.authenticated) {
                    var user_id =res.locals.user.user_id;
                }
    
                results.results = await model.find({user_id : user_id}).populate(array).limit(limit).skip(startIndex).exec();
                res.count = results.results.length;
                res.Results = results;
                next();
            }

        //ErrorCatching :
        } catch (err) {
            res.status(500).json({
                "status": {
                    "success": false,
                    "code": 400,
                    "message": err.message
                }
            });
            console.log(err);
        }
    };
};