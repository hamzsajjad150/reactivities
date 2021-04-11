namespace application.core
{
    public class Result<T>
    {
        public bool isSuccess { get; set; }

        //the T will be activity
        public T Value { get; set; }

        public string Error { get; set; }

        //this function will return the generic obj warpped in the result obj
        //returing the a new result wrapped with generic obj
        public static Result<T> Success(T value) => new Result<T> {isSuccess = true, Value = value};

        //this function will be called in case of a failure
        //works same as the success function
        public static Result<T> Failure(string error) => new Result<T> {isSuccess = false, Error = error};
    }
}