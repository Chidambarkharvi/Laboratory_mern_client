import Login from "./Login";
import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";


describe("Login button", () => {
  it("login button render", () => {
    let { queryByTitle } = render(
      <Provider>
    
        <Login />
      </Provider>
    );
    let btn = queryByTitle("loginBtn");
    expect(btn).toBeTruthy();
  });

  // it("onClick", () => {
  //   let { queryByTitle } = render(
  //     <Provider>
  //       {" "}
  //       <Login />{" "}
  //     </Provider>
  //   );
  //   let btn = queryByTitle("loginBtn");
  //   fireEvent.submit(btn);
  // });
});

// describe("input field test", () => {
//   it("login render", () => {
//     let { queryByTitle } = render(<Login />);
//     let input = queryByTitle("email");
//     expect(input).toBeTruthy();
//   });
//   it("input onChange", () => {
//     let { queryByTitle } = render(<Login />);
//     let input = queryByTitle("email");
//     fireEvent.change(input, { target: { value: "testValue" } });
//     expect(input.value).toBe("testValue");
//   });
// });
