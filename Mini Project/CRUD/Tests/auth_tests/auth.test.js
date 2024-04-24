const request = require('supertest');
const assert = require('assert');
const app = require('../../app');


describe.skip('registerUser' , async () => {
    try{

        it(`to register a new user` , async () => {


            const res = await request(app).post('/register')
            .expect(200)
            .attach('image' , 'C:/Users/prasanth/Pictures/Screenshots/Screenshot (138).png')
            .field('user_name' , 'Kiran')
            .field('gender' , 'male')
            .field('email' , 'kiran@gmail.com')
            .field('job_title' , 'Software Engineer')
            .field('salary' , '40000')
            .field('address' , 'no:1244 , nunkapakam')
            .field('district' , 'Chennai')
            .field('pincode' , '987998')
            .field('role' , 'admin')
            .field('password' , 'kiran@12345')
            .field('town' , 'nunkapakam')
            .field('familyDetails[0][full_name]', 'Arivu')
            .field('familyDetails[0][relationship]', 'father')
            .field('familyDetails[0][occupation]', 'IRCTC officer')
            .field('familyDetails[0][education_level]', 'B.Ed')
            .field('familyDetails[0][contact_no]', '9096543450')
            .field('familyDetails[1][full_name]', 'Vani')
            .field('familyDetails[1][relationship]', 'mother')
            .field('familyDetails[1][occupation]', 'house wife')
            .field('familyDetails[1][education_level]', 'B.E')
            .field('familyDetails[1][contact_no]', '8765400109')
            
            
            

            assert.strictEqual(res.text , `User successfully Register`);
        


        })

    }catch(err){
        console.error(err);
    }
    
})




describe.skip(`loginUser` , async () => {

    it(`to login a valid user` , async () => {

        const payload = {
            "email" : "lakshman@gmail.com",
            "password" : "laxxxx@12345"
        }

        const res = await request(app).post('/login').send(payload).expect(200);

        assert(res.body.hasOwnProperty('user_id'));
        assert(res.body.hasOwnProperty('full_name'));
        assert(res.body.hasOwnProperty('email'));
        assert(res.body.hasOwnProperty('password'));
        assert(res.body.hasOwnProperty('role'));
        assert(res.body.hasOwnProperty('token'));
    })

    it(`to login a user with invalid mail id` , async() => {

        const payload = {
            "email" : "lakshn@gmail.com",
            "password" : "laxxxx@12345"
        }

        const res = await request(app).post('/login').send(payload).expect(400);

        assert.strictEqual(res.body.message , `Invalid Credentials`);
    })

    it(`to login a user with invalid password` , async() => {

        const payload = {
            "email" : "lakshman@gmail.com",
            "password" : "laxx@12345"
        }

        const res = await request(app).post('/login').send(payload).expect(400);

        assert.strictEqual(res.body.message , `Invalid Password`);
    })
})

describe.skip(`forget Password` , async () => {
    it(`trying with valid mail id` , async () => {

        const payload = {
            "email" : "lakshman@gmail.com"
        }
        const res = await request(app).post('/forget-password').send(payload).expect(200);

        assert.strictEqual(res.body.message , 'Password reset email sent successfully');
    })

    it(`trying with invalid mail id` , async () => {

        const payload = {
            "email" : "laksh@gmail.com"
        }

        const res = await request(app).post('/forget-password').send(payload).expect(404);

        assert.strictEqual(res.body.message , 'Invalid credentials');
    })
})

describe.skip(`reset Password` , async () => {
    it(`to reset a password` , async () => {
        const payload = {
            "password" : "llaaxx@12345"
        }
        const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozLCJpYXQiOjE3MTM1MzEyNjEsImV4cCI6MTcxMzUzNDg2MX0.ZAF3QJrXT8iG-H-eWN0bzmQMJXDQEPY_pZASFfVvidc`;
        const res = await request(app).post(`/reset-password`).set('Authorization' , `Bearer ${token}`).send(payload).expect(200);
        assert.strictEqual(res.body.message , 'Password reseted Successfully');
    })

    it(`to reset a password with expired token` , async () => {
        const payload = {
            "password" : "llaaxx@12345"
        }
        const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozLCJpYXQiOjE3MTM1MzEyNjEsImV4cCI6MTcxMzUzNDg2MX0.ZAF3QJrXT8iG-H-eWN0bzmQMJXDQEPY_pZASFfVvidc`;
        const res = await request(app).post(`/reset-password`).set('Authorization' , `Bearer ${token}`).send(payload).expect(400);
        assert.strictEqual(res.body.message , 'Token is expired');
    })
})