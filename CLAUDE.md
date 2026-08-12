# CLAUDE.md

## Contact form rules for this project

1. Successful submission clears form state; failure preserves it.
   - After a valid submit succeeds, reset all field values to empty strings.
   - Validation errors must not clear the form.
   - Simulated submit failures must preserve all entered values.

2. Validation must be field-specific and requirement-driven.
   - Full Name: required, minimum 2 characters, letters and common name punctuation only, Unicode-aware for international names.
   - Email: required and must match valid email structure.
   - Phone: required, accept common international formatting, and validate the number of digits.
   - Message: required, minimum 20 characters, maximum 1000 characters, and show the character count.

3. Preserve user input on all non-success paths.
   - If validation fails, keep the values the user entered.
   - If the simulated submit fails, keep the values the user entered.
   - Only clear the form after a successful submission.

4. Use native accessible form controls and explicitly connect validation errors.
   - Use native input and textarea elements with associated labels.
   - Connect each error message to its field with accessible attributes.
   - Keep the form keyboard-friendly and avoid unnecessary custom widgets.

5. Verify before considering the task complete.
   - Run the build and lint checks.
   - Check browser behavior for validation, success, and failure flows.
   - Confirm the exact success message and that the form state matches the required behavior.

These rules are specific to this contact-form project and to the AI-assisted workflow used here: the model is a drafting tool, not a source of final truth. Human verification is required before the task is considered complete.
