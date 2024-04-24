const assert = require('assert');
const request = require('supertest');
const app = require('../../app');


describe.skip('getAllUser' , () => {
    it('to get all the users with their address and family details' , async () => {

        const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6InByYXNhbnRoMTcwOTAwMUBnbWFpbC5jb20iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3MTMxNTY3NjZ9.ik2FIl9lQxptvj0RyOgfIypSkqjxq6piJUSZEuXNgRg`

        const res = await request(app).get('/getAllusers').set('Authorization' , `Bearer ${token}`).expect(200);

        assert(Array.isArray(res.body));

        res.body.forEach(user => {
            assert(user.hasOwnProperty('id'));
            assert(user.hasOwnProperty('full_name'));
            assert(user.hasOwnProperty('gender'));
            assert(user.hasOwnProperty('email'));
            assert(user.hasOwnProperty('job_title'));
            assert(user.hasOwnProperty('salary'));
            assert(user.hasOwnProperty('profile_path'));
            const userAddress = user.userAddress;
            assert(userAddress.hasOwnProperty('address_id'));
            assert(userAddress.hasOwnProperty('address'));
            assert(userAddress.hasOwnProperty('district'));
            assert(userAddress.hasOwnProperty('town'));
            assert(userAddress.hasOwnProperty('pincode'));
            assert(userAddress.hasOwnProperty('user_id'));
            const userFamily = user.userFamily;
            assert(Array.isArray(userFamily));
            userFamily.forEach(userFamily => {
                assert(userFamily.hasOwnProperty('id'));
                assert(userFamily.hasOwnProperty('full_name'));
                assert(userFamily.hasOwnProperty('relationship'));
                assert(userFamily.hasOwnProperty('occupation'));
                assert(userFamily.hasOwnProperty('education_level'));
                assert(userFamily.hasOwnProperty('contact_no'));
                assert(userFamily.hasOwnProperty('user_id'));
            });
        });
    });
});


describe.skip('getUserById' , () => {
    it('to get a user by id with address and family details' , async () => {

        const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6InByYXNhbnRoMTcwOTAwMUBnbWFpbC5jb20iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3MTMxNTY3NjZ9.ik2FIl9lQxptvj0RyOgfIypSkqjxq6piJUSZEuXNgRg`

        const res = await request(app).get('/getUserById/3').set('Authorization' , `Bearer ${token}`).expect(200);

        assert(res.body.hasOwnProperty('id'));
        assert(res.body.hasOwnProperty('full_name'));
        assert(res.body.hasOwnProperty('gender'));
        assert(res.body.hasOwnProperty('email'));
        assert(res.body.hasOwnProperty('job_title'));
        assert(res.body.hasOwnProperty('salary'));
        assert(res.body.hasOwnProperty('profile_path'));
        const userAddress = res.body.userAddress;
        assert(userAddress.hasOwnProperty('address_id'));
        assert(userAddress.hasOwnProperty('address'));
        assert(userAddress.hasOwnProperty('district'));
        assert(userAddress.hasOwnProperty('town'));
        assert(userAddress.hasOwnProperty('pincode'));
        assert(userAddress.hasOwnProperty('user_id'));
        const userFamily = res.body.userFamily;
        assert(Array.isArray(userFamily));
        userFamily.forEach(userFamily => {
            assert(userFamily.hasOwnProperty('id'));
            assert(userFamily.hasOwnProperty('full_name'));
            assert(userFamily.hasOwnProperty('relationship'));
            assert(userFamily.hasOwnProperty('occupation'));
            assert(userFamily.hasOwnProperty('education_level'));
            assert(userFamily.hasOwnProperty('contact_no'));
            assert(userFamily.hasOwnProperty('user_id'));
        });


    });


    it('to get a user by giving invalid id' , async () => {

        const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6InByYXNhbnRoMTcwOTAwMUBnbWFpbC5jb20iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3MTMxNTY3NjZ9.ik2FIl9lQxptvj0RyOgfIypSkqjxq6piJUSZEuXNgRg`

        const res = await request(app).get('/getUserById/2').set('Authorization' , `Bearer ${token}`).expect(400);

        assert.strictEqual(res.text , `Invalid customer ID :(`);
    });
});


describe('insertUser' , async () => {
    try{

        it(`to insert a new user` , async () => {

            const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6InByYXNhbnRoMTcwOTAwMUBnbWFpbC5jb20iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3MTMxNTY3NjZ9.ik2FIl9lQxptvj0RyOgfIypSkqjxq6piJUSZEuXNgRg`

            const res = await request(app).post('/insertUser').set('Authorization' , `Bearer ${token}`)
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
            
            
            

            assert.strictEqual(res.text , `User successfully added`);
        


        })

    }catch(err){
        console.error(err);
    }
    
})


describe.skip(`updateUser` , async () => {
    it(`to update an user with valid id` , async () => {
        const updatePayload = {
            "address" : "No:567 , anna nagar" ,
            "district" : "Thirumangalam",
            "town" : "Madurai",
            "pincode" : 602502
        }
        const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6InByYXNhbnRoMTcwOTAwMUBnbWFpbC5jb20iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3MTMxNTY3NjZ9.ik2FIl9lQxptvj0RyOgfIypSkqjxq6piJUSZEuXNgRg`
        const res = await request(app).put(`/updateUser/3`).set('Authorization' , `Bearer ${token}`)
        .send(updatePayload)
        .expect(200)
        
        assert.strictEqual(res.text , `user Address were successfully updated`);  
    })

    it(`to update an invalid user` , async () => {
        const updatePayload = {
            "address" : "No:567 , anna nagar" ,
            "district" : "mattuthavani",
            "town" : "Madurai",
            "pincode" : 602502
        }
        const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6InByYXNhbnRoMTcwOTAwMUBnbWFpbC5jb20iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3MTMxNTY3NjZ9.ik2FIl9lQxptvj0RyOgfIypSkqjxq6piJUSZEuXNgRg`
        const res = await request(app).put(`/updateUser/2`).set('Authorization' , `Bearer ${token}`)
        .send(updatePayload)
        .expect(404)
        
        assert.strictEqual(res.text , `Invalid id or Same details are given for update`);  
    })
})

describe.skip(`deleteUser` , async () => {
    try{

        it(`to delete an valid user` , async () => {
            const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6InByYXNhbnRoMTcwOTAwMUBnbWFpbC5jb20iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3MTMxNTY3NjZ9.ik2FIl9lQxptvj0RyOgfIypSkqjxq6piJUSZEuXNgRg`
            const res = await request(app).delete('/deleteUser/4').set('Authorization' , `Bearer ${token}`)
            .expect(200)  
    
            assert.strictEqual(res.text , `user details were successfully deleted`);  
        })
        
        it(`trying to get the data of deleted user` , async () => {

            const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6InByYXNhbnRoMTcwOTAwMUBnbWFpbC5jb20iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3MTMxNTY3NjZ9.ik2FIl9lQxptvj0RyOgfIypSkqjxq6piJUSZEuXNgRg`

            const res = await request(app).get('/getUserById/4').set('Authorization' , `Bearer ${token}`).expect(200);
        })

        it(`to delete an invalid user` , async () => {
            const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6InByYXNhbnRoMTcwOTAwMUBnbWFpbC5jb20iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3MTMxNTY3NjZ9.ik2FIl9lQxptvj0RyOgfIypSkqjxq6piJUSZEuXNgRg`
            const res = await request(app).delete('/deleteUser/4').set('Authorization' , `Bearer ${token}`)
            .expect(404)  
    
            assert.strictEqual(res.text , `Given user_id is Invalid`);  
        })


    }catch(err){
        throw err;
    }
    
})