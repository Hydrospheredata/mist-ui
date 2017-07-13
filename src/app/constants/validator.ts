export class Validator {

  public static validateJSON(params) {
    let isValid = false;
    try {
      JSON.parse(params.value);
      isValid = true;
    } catch (e) {
      isValid = false
    } finally {
      if (isValid) {
        return true
      } else {
        return {'json': true}
      }
    }
  }

}
