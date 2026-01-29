/* ============================================
   HANDS-ON 1: Smart Login Status Engine
   ============================================
   Purpose: Practice conditional logic with multiple if-else statements
   Concept: Nested conditionals to handle user authentication states
   ============================================ */

// Initial data:
    let isLoggedIn = true;         // User authentication status
    let isProfileComplete = false;  // Profile completion status

// Tasks:
   // 1. If user is not logged in → show "Please login" (primary condition check)
   // 2. If logged in but profile incomplete → show "Complete your profile" (nested condition)
   // 3. If logged in and profile complete → show "Welcome back!" (success case)
   // 4. Store the result in message variable
   // 5. Print the message to console
    
   //1. If user is not logged in → show "Please login" (primary condition check)
   let res;
   if(!isLoggedIn){
       res="Please log in"
   } 
   //2. If logged in but profile incomplete → show "Complete your profile" (nested condition)
   else if(!isProfileComplete){
      res="Complete your profile"
   } 
   //3. If logged in and profile complete → show "Welcome back!" (success case)
   else {
       res="Welcome back!"
   }
   //5. Print the message to console
   console.log(res)     




/* ============================================
   HANDS-ON 2: Course Price Tag Labeler
   ============================================
   Purpose: Practice if-else-if ladder for range-based conditions
   Concept: Categorizing numeric values into defined ranges
   ============================================ */

// Initial data:
     let price = 1299;  // Course price in currency units

// Tasks:
   // 1. If price < 500 → "Budget Course" (low price range)
   // 2. If price between 500–1000 → "Standard Course" (mid price range)
   // 3. If price > 1000 → "Premium Course" (high price range)
   // 4. Store label in courseTag variable
   // 5. Print the label to console

// 1. If price < 500 → "Budget Course" (low price range)
let courseTag;
if (price < 500) {
    courseTag = 'Budget Course'
}               
// 2. If price between 500–1000 → "Standard Course" (mid price range)
else if (price >= 500 && price <= 1000) {
    courseTag = 'Standard Course'
}   
// 3. If price > 1000 → "Premium Course" (high price range)
else {
    courseTag = 'Premium Course'
}  
// 5. Print the label to console
console.log('This is a', courseTag) 

