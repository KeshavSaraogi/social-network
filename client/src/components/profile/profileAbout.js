import React from "react"
import PropTypes from "prop-types"

const profileAbout = ({
  profile: {
    bio,
    skills,
    user: { name },
  },
}) => (
  <div class="profile-about bg-light p-2">
    {bio && (
      <Fragment>
        <h2 class="text-primary">{name.trim().split(" ")[0]}'s Bio</h2>
        <p>{bio}</p>
      </Fragment>
    )}

    <div class="line"></div>
    <h2 class="text-primary">Skill Set</h2>
    <div class="skills">
      {skills.map((skills, index) => (
        <div key={index} className="p-1">
          <i className="fas fa-check"></i> {skills}
        </div>
      ))}
    </div>
  </div>
)

profileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
}

export default profileAbout
