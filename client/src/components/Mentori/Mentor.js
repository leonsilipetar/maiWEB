import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useEffect, useState } from 'react';

function MentorDetails({ mentori }) {
  const { mentorId } = useParams();
  const [mentor, setMentor] = useState(null);

  useEffect(() => {
    // Find the mentor by ID from the mentori array
    const selectedMentor = mentori.find(mentor => mentor._id === mentorId); // Assuming mentor._id is the unique identifier
    setMentor(selectedMentor);
  }, [mentorId, mentori]); // Re-run this effect if mentorId or mentori array changes

  // Ensure that mentor is not null before trying to access its properties
  return (
    <>
      <div className="mentori">
        <div className='mentor-detalji'>
          {mentor ? (
            <>
              <h3>{mentor.ime} {mentor.prezime}</h3>
              <p>{mentor.opis}</p>
              </>
          ) : (
            <p>Mentor not found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default MentorDetails;
