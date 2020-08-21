const pool = require('./pool');

function User() {};

User.prototype = {

    add : function(rollnumber, fullname, department, batch, phone, callback){    

        let sql = `INSERT IGNORE INTO nittian(rollnumber,fullname,dept,batch,phone) VALUES (`+rollnumber+`,"`+fullname+`","`+department+`",`+batch+`,`+phone+`);`;
        
        pool.query(sql, function(err, result) {
            if(err) throw err;
             callback(result.insertId);
        });
    },  

    update : function(rollnumber, phone, callback){    

        let sql =  `UPDATE nittian SET phone = ` + phone + ` WHERE rollnumber = ` + rollnumber + `;`;
        
        pool.query(sql, function(err, result) {
            if(err) throw err;
             callback(result.insertId);
        });
    },

    delete : function(rollnumber, callback){    

        let sql =  `DELETE FROM nittian WHERE rollnumber = ` + rollnumber + `;`;
        
        pool.query(sql, function(err, result) {
            if(err) throw err;
             callback(result.insertId);
        });
    }
};

module.exports = User;

