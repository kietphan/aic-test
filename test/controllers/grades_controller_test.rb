require "test_helper"

class GradesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @grade = grades(:one)
  end

  test "should get index" do
    get grades_url, as: :json
    assert_response :success
  end

  test "should create grade" do
    assert_difference("Grade.count") do
      post grades_url, params: { grade: { name: @grade.name } }, as: :json
    end

    assert_response :created
  end

  test "should show grade" do
    get grade_url(@grade), as: :json
    assert_response :success
  end

  test "should update grade" do
    patch grade_url(@grade), params: { grade: { name: @grade.name } }, as: :json
    assert_response :success
  end

  test "should destroy grade" do
    assert_difference("Grade.count", -1) do
      delete grade_url(@grade), as: :json
    end

    assert_response :no_content
  end
end
