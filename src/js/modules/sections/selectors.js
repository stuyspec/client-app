import { createSelector } from "reselect";

export const getSections = state => state.sections.sections;
export const getSectionFromRequestedSlug = (state, props) => props.section;

/**
 * The selector returns a filtered sections object which contains direct
 *   children of a props-requested section. It is used for the subsection bar
 *   on the SectionPage.
 */
export const getDirectSubsections = createSelector(
  [getSections, getSectionFromRequestedSlug],
  (sections, targetSection) => {
    return Object.filter(sections, section => {
      return section.parentId === targetSection.id;
    });
  },
);

/**
 * The selector returns a filtered sections object which contains only top level
 *   sections (sections with no parents).
 */
export const getTopLevelSections = createSelector([getSections], sections =>
  Object.filter(sections, section => section.parentId === null),
);

/**
 * The selector returns a sections object in which all nested section objects
 *   contain the section's direct and indirect section children.
 */
export const getTopLevelSectionsWithChildren = createSelector(
  [getSections, getTopLevelSections],
  (sections, topLevelSections) => {
    return Object.values(topLevelSections).reduce((acc, topLevelSection) => {
      acc[topLevelSection.id] = {
        ...topLevelSection,
        subsections: Object.filter(sections, section => {
          return section.parentId === topLevelSection.id;
        }),
      };
      return acc;
    }, {});
  },
);

/**
 * The selector returns an array of all direct and indirect section children of
 *   a target section for section and subsection routing. It is used for
 *   getting all articles in a section's tree.
 */
export const getSectionTreeIds = createSelector(
  [getSections, getSectionFromRequestedSlug],
  (sections, targetSection) => {
    const subsectionsInSectionTree = Object.filter(sections, section => {
      return section.parentId === targetSection.id;
    });
    const subsectionIds = Object.values(
      subsectionsInSectionTree,
    ).map(subsection => {
      return subsection.id;
    });
    return [targetSection.id, ...subsectionIds];
  },
);

export const getFeaturedSubsection = createSelector(
  [getSections, getSectionFromRequestedSlug],
  (sections, parentSection) => {
    return Object.values(sections).find(
      section => section.parentId === parentSection.id,
    );
  },
);

/**
 * Return an array with all the sectionSlugs
 */

export const getSectionSlugs = createSelector([getSections], sections => {
  return Object.values(sections).map(section => section.slug);
});

export const getColumnSections = createSelector([getSections], sections => {
  const columnSectionNames = [
    "Opinions",
    "Features",
    "Humor",
    "Staff Editorials",
    "Arts & Entertainment",
    "Sports",
  ];
  return columnSectionNames.map(name =>
    Object.values(sections).find(section => {
      return section.name === name;
    }),
  );
});
