// Add new payment POST
exports.AddNewPayment = (req, res)=>{
    res.json(req.body);
}

// get all payment GET
exports.GetAllPayment = (req, res)=>{
    res.json("all Payment with specific parameter");
}

// get payment by id GET
exports.GetPaymentById = (req, res)=>{
    res.json(req.params);
}

// update payment by id PUT
exports.UpdatePaymentById = (req, res)=>{
    res.json({body : req.body, params : req.params});
}

// delete payment by id DELETE
exports.DeletePaymentById = (req, res)=>{
    res.json(req.params);
}