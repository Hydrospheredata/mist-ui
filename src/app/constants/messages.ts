export class Messages {
  public static ERRORS = {
    forms: {
      addEndpoint: {
        'name': {
          'required':      'Name is required.',
          'minlength':     'Name must be at least 4 characters long.',
          'maxlength':     'Name cannot be more than 24 characters long.',
          'forbiddenName': 'Someone named "Bob" cannot be a hero.'
        },
        'path': {
          'required': 'Path is required.',
          'minlength':     'Name must be at least 4 characters long.',
        }
      }
    }
  };
}
