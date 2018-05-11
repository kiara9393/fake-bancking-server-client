var express = require('express');
var router = express.Router();
var Account = require('../models/Account');
var Transaction = require('../models/Transaction');
var auth = require('../middlewares/auth');


var ibanPresent = function(req, res, next) {
    Account.findOne({iban: req.body.iban}, function(err, account){
        if (err) return res.status(500).json({message: err});
        if (!account) return res.status(400).json({message: 'Iban not found'})
        req.beneficiary = account;
        next();
    })
  }
  
  
var creditPresent = function(req, res, next) {
    if (Account.money < Transaction.amount) {
            return res.status(409).json({message: 'Insufficient money'})
     }  else {
          next();
     }
}


router.post('/newTransaction', auth.verify, ibanPresent, creditPresent, function(req, res) {
     var transaction = new Transaction();
     transaction.benefactor= req.account.iban;
     transaction.beneficiary= req.beneficiary.iban;
     transaction.amount= req.body.amount;

     req.account.money = parseInt(req.account.money) - parseInt(req.body.amount);
     req.beneficiary.money = parseInt(req.beneficiary.money) + parseInt(req.body.amount);

     req.account.save(function(err, benefactorSaved) {   
       if (err) return res.status(500).json({message: err});  
         req.beneficiary.save(function(err, beneficiarySaved) {   
               if (err) return res.status(500).json({message: err}); 
                 transaction.save(function(err, saveTransaction) {
                    if (err) return res.status(500).json(err);
                     res.status(201).json(saveTransaction);
                 })
        })
    })
})

router.get('/allTransaction', auth.verify, function(req, res, next) {   
        Transaction.find({}, function (err, transaction){
         if (err) return res.status(500).json({message: err});
         res.json(transaction)
         })
     })


module.exports = router;