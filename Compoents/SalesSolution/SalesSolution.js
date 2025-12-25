function openTab(tabId) {
  // Hide all tab panes
  const tabPanes = document.getElementsByClassName("tab-pane");
  for (let i = 0; i < tabPanes.length; i++) {
    tabPanes[i].style.display = "none";
    tabPanes[i].classList.remove("active");
  }

  // Show the selected tab pane
  const selectedTab = document.getElementById(tabId);
  if (selectedTab) {
    selectedTab.style.display = "block";
    selectedTab.classList.add("active");
  }

  // Update active class for buttons
  const tabBtns = document.getElementsByClassName("tab-btn");
  for (let i = 0; i < tabBtns.length; i++) {
    tabBtns[i].classList.remove("active");
    if (tabBtns[i].getAttribute("onclick").includes(tabId)) {
      tabBtns[i].classList.add("active");
    }
  }
}
