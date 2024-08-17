/**
 * @jest-environment jest-environment-jsdom
 */

import { renderProfileScrollbar } from './refactoredCode'; 

const posts = [
    {
      profilePicture: "./img/thumbnails/testuser.jpg",
      profileName: "TestUser",
    },
    {
      profilePicture: "./img/thumbnails/anotheruser.jpg",
      profileName: "AnotherUser",
    },
  ];
  
  // Mock für document.getElementById
  document.getElementById = jest.fn().mockImplementation((id) => {
    if (id === "profilesScrollbar") {
      return {
        innerHTML: "",
      };
    }
  });

  
  describe("renderProfileScrollbar", () => {
    it("should render profile scrollbar with correct content", () => {
      renderProfileScrollbar();
  
      const expectedHTML = `
        <div class="account">
          <img src="./img/thumbnails/testuser.jpg">
          <span>TestUser</span>
        </div>
        <div class="account">
          <img src="./img/thumbnails/anotheruser.jpg">
          <span>AnotherUser</span>
        </div>
      `
      expect(document.getElementById("profilesScrollbar").innerHTML.trim()).toBe(expectedHTML);
    });
  });
  