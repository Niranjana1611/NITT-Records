const express = require('express');
const User = require('../core/user');
const router = express.Router();
const mysql = require('mysql');
const pool = require('../core/pool');

const user = new User();

router.get('/', (req, res, next) => {
    res.render('index');
})

router.get('/add', (req, res) => {
    res.render('add');
})

router.post('/added', (req, res) => {
    user.add(req.body.rollnumber, req.body.fullmane, req.body.department, req.body.batch, req.body.phone, function(lastId){
        res.redirect("/");
    });
})

router.get('/modify', (req, res, next) => {
    res.render('modify');
})

var rollnumber;

router.post('/open', (req, res) => {
    rollnumber = req.body.rollnumber;
    pool.getConnection(function(err){
        if(err)
            throw err;

        var query = `SELECT * FROM nittian WHERE rollnumber = `+req.body.rollnumber;
        
        pool.query(query,function(err,data){
            if(err)
                throw err;
            else {
                res.render("open",{
                    details: data
                });  
            }
        });
    });
})

router.post('/update', (req, res) => {
    user.update(rollnumber, req.body.mod_phone, function(lastId){
        res.redirect("/");
    });
})

router.get('/delete', (req, res, next) => {
    res.render('delete');
});

router.post('/deleterno', (req, res) => {
    user.delete(req.body.rollnumber, function(lastId){
        res.redirect("/");
    });
})

router.get('/search',function(req,res){
    
    let sql = `SELECT rollnumber from nittian where rollnumber like "%`+req.query.rollnumber+`%"`;
    
    pool.query(sql, function(err, rows, fields) {
        if (err) throw err;
        var data=[];
        for(let i=0;i<rows.length;i++){
            (JSON.stringify(data));

            data.push(rows[i].rollnumber);
        }
        
        //res.write
        res.render('index',{
            data: data
        });
    });
});

router.post('/go', (req, res) => {
    console.log(req.body.roll)
    pool.getConnection(function(err){
        if(err)
            throw err;

        var query = `SELECT * FROM nittian WHERE rollnumber = `+req.body.roll+`;`;
        
        pool.query(query,function(err,data){
            if(err)
                throw err;
            else {
                res.render("go",{
                    searched: data
                });  
            }
        });
    });
})

module.exports = router;
