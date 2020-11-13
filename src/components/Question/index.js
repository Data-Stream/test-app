import React, { useEffect } from "react";
import Answer from "../Answer";
import PileBox from "../PileBox";
import Button from "../Button";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { QuestionText, LengthQuestions } from "./style";
import { Content, BtnBox } from "../styled/Lib";
import { loadAnswers, offSelectedAnswer } from "../../redux/features/answers";
import { onNextQuestion } from "../../redux/features/questions";

const Question = () => {
  const dispatch = useDispatch();
  const paramsId = useParams().id;
  let history = useHistory();

  const activeQuestion = useSelector((state) => state.questions.activeQuestion);
  const answerSelected = useSelector((state) => state.answers.answerSelected);

  const questions = useSelector((state) =>
    state.questions.items.filter((item) => item.testId.toString() === paramsId)
  );
  const question = questions[activeQuestion];

  useEffect(() => {
    dispatch(loadAnswers(question?.id));
  }, [dispatch, question?.id]);

  const answers = useSelector((state) => state.answers.items);

  const handleClick = () => {
    if (activeQuestion + 1 < questions.length) {
      dispatch(onNextQuestion());
      dispatch(offSelectedAnswer());
      history.push(`/${paramsId}/${question.id + 1}`);
    } else {
      history.push("/result");
    }
  };

  return (
    <Content>
      <QuestionText>{question?.text}</QuestionText>
      {answers.map((answer) => (
        <Answer key={answer.id} answer={answer} />
      ))}
      {answerSelected && (
        <BtnBox>
          <Button onClick={handleClick}>
            {question.id !== questions.length ? "Далее" : "Завершить"}
          </Button>
        </BtnBox>
      )}
      <LengthQuestions>
        {question.id}/{questions.length}
      </LengthQuestions>
      <PileBox />
    </Content>
  );
};

export default Question;
