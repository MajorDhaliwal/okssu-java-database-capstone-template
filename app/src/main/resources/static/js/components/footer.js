/*
  Function to render the footer content into the page
      Select the footer element from the DOM
      Set the inner HTML of the footer element to include the footer content
  This section dynamically generates the footer content for the web page, including the hospital's logo, copyright information, and various helpful links.
*/

function renderFooter() {
  // 1. Select the footer container
  const footer = document.getElementById("footer");
  if (!footer) return;

  // 2. Insert Footer HTML Content
  footer.innerHTML = `
    <!-- 2. Footer Wrapper -->
    <footer class="footer">

      <!-- 3. Footer Container -->
      <div class="footer-container">

        <!-- 4. Logo and Copyright -->
        <div class="footer-logo">
          <img src="../assets/images/logo/logo.png" alt="Hospital CMS Logo">
          <p>© Copyright ${new Date().getFullYear()}. All Rights Reserved by Hospital CMS.</p>
        </div>

        <!-- 5. Links Section -->
        <div class="footer-links">

          <!-- 6. Company Column -->
          <div class="footer-column">
            <h4>Company</h4>
            <a href="#">About</a>
            <a href="#">Careers</a>
            <a href="#">Press</a>
          </div>

          <!-- 7. Support Column -->
          <div class="footer-column">
            <h4>Support</h4>
            <a href="#">Account</a>
            <a href="#">Help Center</a>
            <a href="#">Contact Us</a>
          </div>

          <!-- 8. Legals Column -->
          <div class="footer-column">
            <h4>Legals</h4>
            <a href="#">Terms & Conditions</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Licensing</a>
          </div>

        </div> <!-- End of footer-links -->

      </div> <!-- 9. Close the Footer Container -->

    </footer> <!-- 10. Close the Footer Element -->
  `;
}

// 11. Call the function to populate the footer on page load
renderFooter();
