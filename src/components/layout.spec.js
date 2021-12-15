import React from "react"
import renderer from "react-test-renderer"
import * as Gatsby from 'gatsby';
import Layout from "./layout"

const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery');
useStaticQuery.mockImplementation(() => ({
  site: {
    siteMetadata: {
      title: 'pimentel.page',
    },
  },
}));

beforeEach(() => {
    jest.clearAllMocks();
  });

describe("Layout", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Layout pageTitle="Test Page"  isHome="false"><p>Test Page</p></Layout>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})