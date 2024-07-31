const getData = () => {

}

module.exports.getProducts = async (req, res, next) => {
    try {
        const data = await getData();
    }
    catch(error){
       console.log(error);
       next(err);
    }
}