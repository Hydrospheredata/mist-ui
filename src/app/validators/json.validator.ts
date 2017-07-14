export class JSONValidator {

  public static validate(params) {
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
