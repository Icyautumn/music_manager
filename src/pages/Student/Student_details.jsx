import React, { useState, useEffect } from "react";
import styles from "./Student_details.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import SendIcon from '@mui/icons-material/Send';
import DescriptionIcon from "@mui/icons-material/Description";
import Stack from "@mui/material/Stack";
import { Button, Avatar } from "@material-ui/core";
import Loading from "../Loading/Loading";

function Student_details() {
  const urlParameters = useParams();
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudentDetails();
  }, []);

  const fetchStudentDetails = async () => {
    const response = await axios
      .get(
        `https://8nnc5jq04m.execute-api.us-east-1.amazonaws.com/music_portal/students/${urlParameters.token}/${urlParameters.student_id}`
        // {headers:{
        //   Authorization: `Bearer ${token}`,
        // }}
      )
      .catch((err) => console.log(err));

    if (response) {
      const student = await response.data;
      setProfile(student);

      console.log("Products: ", student);
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <Loading/>
      ) : (
        <div className="student-profile py-4">
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <div className="card shadow-sm">
                  <div className="card-header bg-transparent text-center">
                    <Avatar
                      className="profile_img"
                      alt={profile[0].name}
                      src={profile[0].profile_picture}
                    />
                    <h3>{profile[0].name}</h3>
                  </div>
                  <div className="card-body">
                    <p className="mb-0">
                      <strong className="pr-1">Email</strong>
                      {profile[0].email}
                    </p>
                    <p className="mb-0">
                      <strong className="pr-1">Contact:</strong>
                      {profile[0].contact}
                    </p>
                    <Stack direction="row" spacing={2}>
                      <Button
                        variant="outlined"
                        startIcon={<DescriptionIcon />}
                      >
                        Invoice Record
                      </Button>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                      <Button
                        variant="outlined"
                        startIcon={<SendIcon />}
                        onClick={() => navigate(`/invoice/${urlParameters.token}/${urlParameters.student_id}`)}
                      >
                        Send Invoice
                      </Button>
                    </Stack>
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="card shadow-sm">
                  <div className="card-header bg-transparent border-0">
                    <h3 className="mb-0">
                      <i className="far fa-clone pr-1"></i>General Information
                    </h3>
                  </div>
                  <div className="card-body pt-0">
                    <table className="table table-bordered">
                      <tr>
                        <th width="30%">Roll</th>
                        <td width="2%">:</td>
                        <td>125</td>
                      </tr>
                      <tr>
                        <th width="30%">Academic Year </th>
                        <td width="2%">:</td>
                        <td>2020</td>
                      </tr>
                      <tr>
                        <th width="30%">Gender</th>
                        <td width="2%">:</td>
                        <td>Male</td>
                      </tr>
                      <tr>
                        <th width="30%">Religion</th>
                        <td width="2%">:</td>
                        <td>Group</td>
                      </tr>
                      <tr>
                        <th width="30%">blood</th>
                        <td width="2%">:</td>
                        <td>B+</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Student_details;
