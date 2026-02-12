# Testing Log - DreamTrips Honeymoon Enquiry Form

## Project Information
- **Project**: DreamTrips Honeymoon Enquiry Form
- **Student**: [Your Name]
- **Date Started**: [Date]
- **Version**: 1.0

---

## Learn Area Testing (Required Evidence)

### A) Presence Check Example
**Test Date**: 2024-01-15  
**Field**: Full name (example)

| Test Case | Input | Expected Result | Actual Result | Status |
|-----------|-------|----------------|---------------|---------|
| PASS Test | "John Smith" | "PASS: A value has been entered." | "PASS: A value has been entered." | ✅ PASS |
| FAIL Test | "" (empty) | "Please enter a value. This field cannot be blank." | "Please enter a value. This field cannot be blank." | ✅ PASS |

### B) Digit Check Example
**Test Date**: 2024-01-15  
**Field**: Phone number (example)

| Test Case | Input | Expected Result | Actual Result | Status |
|-----------|-------|----------------|---------------|---------|
| PASS Test | "07123456789" | "PASS: Digits only." | "PASS: Digits only." | ✅ PASS |
| FAIL Test | "071 234 5678" | "FAIL: Digits only. Remove spaces, letters, or symbols." | "FAIL: Digits only. Remove spaces, letters, or symbols." | ✅ PASS |
| FAIL Test | "abc123" | "FAIL: Digits only. Remove spaces, letters, or symbols." | "FAIL: Digits only. Remove spaces, letters, or symbols." | ✅ PASS |

### C) Format Check Example (Email)
**Test Date**: 2024-01-15  
**Field**: Email address (example)

| Test Case | Input | Expected Result | Actual Result | Status |
|-----------|-------|----------------|---------------|---------|
| PASS Test | "user@example.com" | "PASS: Email format looks valid." | "PASS: Email format looks valid." | ✅ PASS |
| FAIL Test | "userexample.com" | "FAIL: Enter an email in the format name@example.com." | "FAIL: Enter an email in the format name@example.com." | ✅ PASS |
| FAIL Test | "user@" | "FAIL: Enter an email in the format name@example.com." | "FAIL: Enter an email in the format name@example.com." | ✅ PASS |

### D) Range Check Example (1 to 5)
**Test Date**: 2024-01-15  
**Field**: Rating (example)

| Test Case | Input | Expected Result | Actual Result | Status |
|-----------|-------|----------------|---------------|---------|
| PASS Test | "3" | "PASS: Number is within the range 1 to 5." | "PASS: Number is within the range 1 to 5." | ✅ PASS |
| FAIL Test | "0" | "FAIL: Number must be between 1 and 5." | "FAIL: Number must be between 1 and 5." | ✅ PASS |
| FAIL Test | "6" | "FAIL: Number must be between 1 and 5." | "FAIL: Number must be between 1 and 5." | ✅ PASS |
| FAIL Test | "abc" | "FAIL: Please enter a valid number." | "FAIL: Please enter a valid number." | ✅ PASS |

### E) Length Check Example (Max 20 characters)
**Test Date**: 2024-01-15  
**Field**: Special requests (example)

| Test Case | Input | Expected Result | Actual Result | Status |
|-----------|-------|----------------|---------------|---------|
| PASS Test | "Vegetarian meals" | "PASS: Message length is within the limit." | "PASS: Message length is within the limit." | ✅ PASS |
| FAIL Test | "This message is definitely longer than twenty characters" | "FAIL: Keep your message to 20 characters or fewer." | "FAIL: Keep your message to 20 characters or fewer." | ✅ PASS |

---

## Apply Area Testing (Student Implementation)

### Customer Email Field
**Test Date**: [Date]  
**Field**: Customer Email

| Test Case | Input | Expected Result | Actual Result | Status |
|-----------|-------|----------------|---------------|---------|
| PASS Test | "customer@email.com" | [Expected message] | [Actual message] | [Status] |
| FAIL Test | "invalid-email" | [Expected message] | [Actual message] | [Status] |

### Travel Date Field
**Test Date**: [Date]  
**Field**: Preferred Travel Date

| Test Case | Input | Expected Result | Actual Result | Status |
|-----------|-------|----------------|---------------|---------|
| PASS Test | "2024-06-15" | [Expected message] | [Actual message] | [Status] |
| FAIL Test | "2023-01-01" | [Expected message] | [Actual message] | [Status] |

### Budget Range Field
**Test Date**: [Date]  
**Field**: Budget Range

| Test Case | Input | Expected Result | Actual Result | Status |
|-----------|-------|----------------|---------------|---------|
| PASS Test | "5000" | [Expected message] | [Actual message] | [Status] |
| FAIL Test | "-100" | [Expected message] | [Actual message] | [Status] |

---

## Form Submission Testing

### Complete Form Submission
**Test Date**: [Date]

| Test Scenario | All Fields Valid | Some Fields Invalid | All Fields Empty |
|---------------|------------------|-------------------|------------------|
| Expected Behavior | Form submits successfully | Shows validation errors | Shows all required field errors |
| Actual Behavior | [Record actual behavior] | [Record actual behavior] | [Record actual behavior] |
| Status | [Pass/Fail] | [Pass/Fail] | [Pass/Fail] |

---

## Accessibility Testing

### Keyboard Navigation
**Test Date**: [Date]

| Test | Expected | Actual | Status |
|------|----------|--------|---------|
| Tab through all form fields | Logical tab order | [Record actual] | [Pass/Fail] |
| Skip link functionality | Jumps to main content | [Record actual] | [Pass/Fail] |
| Error message focus | Screen reader announces errors | [Record actual] | [Pass/Fail] |

### Screen Reader Testing
**Test Date**: [Date]

| Element | Expected Announcement | Actual Announcement | Status |
|---------|----------------------|-------------------|---------|
| Form labels | Label text read with field | [Record actual] | [Pass/Fail] |
| Error messages | Error announced when displayed | [Record actual] | [Pass/Fail] |
| Form status | Status updates announced | [Record actual] | [Pass/Fail] |

---

## Browser Compatibility Testing

| Browser | Version | Form Functionality | Validation | CSS Styling | Status |
|---------|---------|-------------------|------------|-------------|---------|
| Chrome | [Version] | [Working/Issues] | [Working/Issues] | [Working/Issues] | [Pass/Fail] |
| Firefox | [Version] | [Working/Issues] | [Working/Issues] | [Working/Issues] | [Pass/Fail] |
| Safari | [Version] | [Working/Issues] | [Working/Issues] | [Working/Issues] | [Pass/Fail] |
| Edge | [Version] | [Working/Issues] | [Working/Issues] | [Working/Issues] | [Pass/Fail] |

---

## Issues Found and Resolved

### Issue #1
**Date**: [Date]  
**Description**: [Describe the issue]  
**Steps to Reproduce**: [List steps]  
**Expected Result**: [What should happen]  
**Actual Result**: [What actually happened]  
**Resolution**: [How it was fixed]  
**Status**: [Resolved/Open]

### Issue #2
**Date**: [Date]  
**Description**: [Describe the issue]  
**Resolution**: [How it was fixed]  
**Status**: [Resolved/Open]

---

## Testing Summary

**Total Tests Conducted**: [Number]  
**Tests Passed**: [Number]  
**Tests Failed**: [Number]  
**Critical Issues**: [Number]  
**Minor Issues**: [Number]

**Overall Assessment**: [Pass/Fail with comments]

**Recommendations for Improvement**:
- [List any recommendations]
- [Additional suggestions]

---

## Sign-off

**Tested by**: [Your Name]  
**Date**: [Date]  
**Signature**: [Your signature or initials]