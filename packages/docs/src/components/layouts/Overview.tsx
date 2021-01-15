import React from "react";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { PageHeader } from "@nice-digital/nds-page-header";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Link, graphql } from "gatsby";
import { StackedNav, StackedNavLink } from "@nice-digital/nds-stacked-nav";
import Seo from "../../components/partials/Seo";
import Wrapper from "../../components/layouts/Wrapper";

type OverviewTypes = {
	location: {
		pathname: string;
	};
	pathContext: {
		sectionRegex: string;
	};
	data: {
		mdx: {
			frontmatter: {
				title: string;
				description: string;
			};
			id: string;
			body: string;
		};
		allMdx: {
			nodes: [
				{
					id: string;
					fields: {
						slug: string;
					};
					frontmatter: {
						title: string;
						description: string;
					};
				}
			];
		};
	};
};

export const query = graphql`
	query($slug: String!, $sectionRegex: String!) {
		# Main page query
		mdx(fields: { slug: { eq: $slug } }) {
			id
			frontmatter {
				title
				description
			}
			body
		}
		# Query to generate the navigation from
		allMdx(
			sort: { fields: [frontmatter___sort, frontmatter___title] }
			filter: { slug: { regex: $sectionRegex } }
		) {
			nodes {
				id
				fields {
					slug
				}
				frontmatter {
					title
					description
				}
			}
		}
	}
`;

export default function Overview(props: OverviewTypes) {
	const {
		id,
		body,
		frontmatter: { title, description }
	} = props.data.mdx;

	const { nodes } = props.data.allMdx;

	return (
		<Wrapper className="pt--e">
			<pre>Overview.tsx</pre>
			<Grid>
				<GridItem cols={12}>
					<PageHeader heading={title} lead={description} />
				</GridItem>
			</Grid>
			<Grid gutter="loose">
				<GridItem cols={12} sm={3} md={2}>
					<StackedNav>
						{nodes.map(
							({ id: childId, fields: { slug }, frontmatter: { title } }) => {
								return (
									<StackedNavLink
										isCurrent={childId === id}
										key={childId}
										destination={slug}
										elementType={Link}
									>
										{title}
									</StackedNavLink>
								);
							}
						)}
					</StackedNav>
				</GridItem>

				<GridItem cols={12} sm={9} md={10}>
					{body && <MDXRenderer>{body}</MDXRenderer>}
					<Grid
						gutter="loose"
						elementType="ul"
						className="list--unstyled width-100"
					>
						{nodes.map(
							({
								id: childId,
								fields: { slug },
								frontmatter: { title, description }
							}) => {
								// Exclude yourself from this list, unlike the nav. Empty return object necessary for component typing at the moment.
								if (id === childId) return <></>;
								return (
									<GridItem
										key={childId}
										cols={6}
										sm={4}
										md={3}
										elementType="li"
									>
										<h2 className="h4">
											<Link to={slug}>{title}</Link>
										</h2>
										<p>{description}</p>
									</GridItem>
								);
							}
						)}
					</Grid>
				</GridItem>
			</Grid>
		</Wrapper>
	);
}
