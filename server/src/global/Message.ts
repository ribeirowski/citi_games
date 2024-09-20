export default class Message {
  static INSERTED_IN_DATABASE = "the value was INSERTED IN THE DATABASE";
  static GET_ALL_VALUES_FROM_DATABASE = "get all the values from the database";
  static VALUE_WAS_FOUND = "the values was FOUND BY ID";
  static VALUE_DELETED_FROM_DATABASE = "the value was DELETED from DATABASE";
  static VALUE_WAS_UPDATED = "the value was UPDATED";
  static PLAYER_ADDED = "the player was ADDED";
  static PLAYER_ALREADY_ADDED = "the player was ALREADY ADDED";
  static PLAYER_DELETED = "the player was DELETED";
  static PLAYER_NOT_IN_MATCH = "the player was NOT in the match";

  static LOGIN_ALREADY_EXIST = "The email or username ALREADY EXIST!";

  static ERROR_INSERTING_DATABASE =
    "Something Wrong. ERROR INSERTING IN DATABASE";
  static ERROR_GETTING_VALUES_FROM_DATABASE =
    "Something Wrong. ERROR GETTING FROM DATABASE";
  static VALUE_WAS_NOT_FOUND =
    "Something Wrong. The values was ->>NOT<<- FOUND BY ID";
  static ERROR_AT_DELETE_FROM_DATABASE =
    "Something Wrong. The value was NOT deleted";
  static ERROR_AT_UPDATE_FROM_DATABASE =
    "Something Wrong. The value was NOT updated";
}
