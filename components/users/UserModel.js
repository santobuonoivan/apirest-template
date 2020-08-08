class UserModel {
    constructor({uuid, first_name, last_name, username, password, email, address,
                    phone, mobile, city, state, country, is_active, profile_image, deleted_at, created_at, updated_at
                } = {}){
        this._user_id;
        this._uuid = uuid;
        this._username = username;
        this._email = email;
        this._first_name = first_name;
        this._last_name = last_name;
        this._password = password;
        this._address = address
        this._phone = phone,
        this._mobile = mobile,
        this._city = city,
        this._state = state,
        this._country = country,
        this._is_active = is_active,
        this._profile_image = profile_image,
        this._delete_at = deleted_at,
        this._updated_at = updated_at,
        this._created_at = created_at
    }

    get uuid(){
        return this._uuid;
    }
    set uuid(value){
        this._uuid = value;
    }


    get username(){
        return this._username;
    }
    set username(value){
        this._username = value;
    }


    get email(){
        return this._email;
    }
    set email(value){
        this._email = value;
    }


    get address(){
        return this._address;
    }
    set address(value){
        this._address =  value;
    }


    get password(){
        return this._password;
    }
    set password(value){
        this._password = value;
    }


    get first_name(){
        return this._first_name;
    }
    set first_name(value){
        this._first_name = value;
    }


    get last_name(){
        return this._last_name;
    }
    set last_name(value){
        this._last_name = value;
    }


    get phone(){
        return this._phone
    }
    set phone(value){
        this._phone = value;
    }



    get mobile(){
        return this._mobile;
    }
    set mobile(value){
        this._mobile = value;
    }



    get city(){
        return this._city;
    }
    set city(value){
        this._city = value;
    }


    get state(){
        return this._state;
    }
    set state(value){
        this._state = value;
    }


    get country(){
        return this._country;
    }
    set country(value){
        this._country = value;
    }



    get is_active(){
        return this._is_active;
    }
    set is_active(value){
        this._is_active = value;
    }


    get profile_image(){
        return this._profile_image;
    }
    set profile_image(value){
        this._profile_image = value;
    }


    get deleted_at(){
        return this._delete_at;
    }
    set deleted_at(value){
        this._delete_at = value;
    }


    get updated_at(){
        return this._updated_at;
    }
    set updated_at(value){
        this._updated_at = value;
    }


    get created_at(){
        return this._created_at;
    }
    set created_at(value){
        this._created_at = value;
    }

    getNombres(){
        return this._first_name + ' ' + this._last_name;
    }
}

module.exports = UserModel;